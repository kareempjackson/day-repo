declare global {
  interface Window {
    StripeTerminal?: any;
  }
}

export interface StripeTerminalInstance {
  discoverReaders: () => Promise<{ discoveredReaders: any[] }>;
  connectReader: (reader: any) => Promise<{ reader: any }>;
  collectPaymentMethod: (clientSecret: string) => Promise<{ paymentIntent: any; error?: any }>;
  processPayment: (paymentIntent: any) => Promise<{ paymentIntent: any; error?: any }>;
  cancelCollectPaymentMethod: () => Promise<void>;
}

let terminalInstance: StripeTerminalInstance | null = null;

export async function initStripeTerminal(): Promise<StripeTerminalInstance> {
  if (terminalInstance) {
    return terminalInstance;
  }

  if (typeof window === 'undefined') {
    throw new Error('Stripe Terminal can only be initialized in the browser');
  }

  // Load Stripe Terminal SDK if not already loaded
  if (!window.StripeTerminal) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/terminal/v1/';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Stripe Terminal SDK'));
      document.head.appendChild(script);
    });
  }

  const terminal = window.StripeTerminal.create({
    onFetchConnectionToken: async () => {
      const response = await fetch('/api/stripe/connection-token', {
        method: 'POST',
      });
      const data = await response.json();
      return data.secret;
    },
    onUnexpectedReaderDisconnect: () => {
      console.warn('Reader disconnected unexpectedly');
    },
  });

  terminalInstance = terminal;
  return terminal;
}

export async function collectCardPayment(
  terminal: StripeTerminalInstance,
  clientSecret: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const collectResult = await terminal.collectPaymentMethod(clientSecret);
    
    if (collectResult.error) {
      return { success: false, error: collectResult.error.message };
    }

    const processResult = await terminal.processPayment(collectResult.paymentIntent);
    
    if (processResult.error) {
      return { success: false, error: processResult.error.message };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Card payment failed' 
    };
  }
}

export async function cancelPayment(terminal: StripeTerminalInstance): Promise<void> {
  try {
    await terminal.cancelCollectPaymentMethod();
  } catch (error) {
    console.warn('Failed to cancel payment collection:', error);
  }
}
