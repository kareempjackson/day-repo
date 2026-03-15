'use client';

import { useState, useCallback } from 'react';
import { PaymentModal } from './PaymentModal';
import { ProcessingModal } from './ProcessingModal';
import { SuccessScreen } from './SuccessScreen';
import { ChargeButton } from './ChargeButton';
import { PaymentType } from '@/types/order';
import { payOrder, confirmOrder } from '@/lib/api';
import { initStripeTerminal, collectCardPayment, cancelPayment, StripeTerminalInstance } from '@/lib/stripe-terminal';

type PaymentState = 'idle' | 'selecting' | 'processing' | 'success';

interface PaymentFlowProps {
  orderId: string;
  amount: number;
  onPaymentComplete: () => void;
  onNewOrder: () => void;
}

export function PaymentFlow({ orderId, amount, onPaymentComplete, onNewOrder }: PaymentFlowProps) {
  const [state, setState] = useState<PaymentState>('idle');
  const [paymentType, setPaymentType] = useState<PaymentType>('cash');
  const [error, setError] = useState<string | undefined>();
  const [terminalInstance, setTerminalInstance] = useState<StripeTerminalInstance | null>(null);

  const handleCharge = useCallback(() => {
    if (amount <= 0) return;
    setState('selecting');
    setError(undefined);
  }, [amount]);

  const handleCloseModal = useCallback(() => {
    setState('idle');
    setError(undefined);
  }, []);

  const processCashPayment = useCallback(async () => {
    setState('processing');
    setPaymentType('cash');
    setError(undefined);

    try {
      const payResult = await payOrder(orderId, 'cash');
      if (!payResult.success) {
        setError(payResult.error || 'Cash payment failed');
        return;
      }

      const confirmResult = await confirmOrder(orderId);
      if (!confirmResult.success) {
        setError(confirmResult.error || 'Order confirmation failed');
        return;
      }

      setState('success');
      onPaymentComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  }, [orderId, onPaymentComplete]);

  const processCardPayment = useCallback(async () => {
    setState('processing');
    setPaymentType('card');
    setError(undefined);

    try {
      // Initialize Stripe Terminal
      const terminal = await initStripeTerminal();
      setTerminalInstance(terminal);

      // Call pay endpoint to get client secret
      const payResult = await payOrder(orderId, 'card');
      if (!payResult.success) {
        setError(payResult.error || 'Failed to initiate card payment');
        return;
      }

      // Collect card payment via terminal
      const clientSecret = payResult.transactionId;
      if (!clientSecret) {
        setError('No payment intent received from server');
        return;
      }

      const cardResult = await collectCardPayment(terminal, clientSecret);
      if (!cardResult.success) {
        setError(cardResult.error || 'Card payment failed');
        return;
      }

      // Confirm the order
      const confirmResult = await confirmOrder(orderId);
      if (!confirmResult.success) {
        setError(confirmResult.error || 'Order confirmation failed');
        return;
      }

      setState('success');
      onPaymentComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  }, [orderId, onPaymentComplete]);

  const handleSelectPaymentType = useCallback((type: PaymentType) => {
    if (type === 'cash') {
      processCashPayment();
    } else {
      processCardPayment();
    }
  }, [processCashPayment, processCardPayment]);

  const handleRetry = useCallback(() => {
    setError(undefined);
    if (paymentType === 'cash') {
      processCashPayment();
    } else {
      processCardPayment();
    }
  }, [paymentType, processCashPayment, processCardPayment]);

  const handleCancelProcessing = useCallback(async () => {
    if (terminalInstance && paymentType === 'card') {
      await cancelPayment(terminalInstance);
    }
    setState('selecting');
    setError(undefined);
  }, [terminalInstance, paymentType]);

  const handleNewOrder = useCallback(() => {
    setState('idle');
    setError(undefined);
    setTerminalInstance(null);
    onNewOrder();
  }, [onNewOrder]);

  return (
    <>
      <ChargeButton 
        amount={amount} 
        onCharge={handleCharge} 
        disabled={state !== 'idle'}
      />

      <PaymentModal
        isOpen={state === 'selecting'}
        amount={amount}
        onSelectPaymentType={handleSelectPaymentType}
        onClose={handleCloseModal}
      />

      <ProcessingModal
        isOpen={state === 'processing'}
        paymentType={paymentType}
        error={error}
        onRetry={handleRetry}
        onCancel={handleCancelProcessing}
      />

      <SuccessScreen
        isOpen={state === 'success'}
        onNewOrder={handleNewOrder}
      />
    </>
  );
}
