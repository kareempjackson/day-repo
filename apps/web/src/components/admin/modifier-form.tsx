'use client';

import { useState } from 'react';
import { Modifier, MODIFIER_TYPES } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface ModifierFormProps {
  modifiers: Modifier[];
  onChange: (modifiers: Modifier[]) => void;
}

export function ModifierForm({ modifiers, onChange }: ModifierFormProps) {
  const [newModifier, setNewModifier] = useState<{
    type: 'size' | 'milk';
    name: string;
    priceAdjustment: string;
  }>({
    type: 'size',
    name: '',
    priceAdjustment: '',
  });
  const [errors, setErrors] = useState<{ name?: string; priceAdjustment?: string }>({});
  
  const validateModifier = () => {
    const newErrors: { name?: string; priceAdjustment?: string } = {};
    
    if (!newModifier.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const price = parseFloat(newModifier.priceAdjustment);
    if (isNaN(price)) {
      newErrors.priceAdjustment = 'Valid price adjustment is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddModifier = () => {
    if (!validateModifier()) return;
    
    const modifier: Modifier = {
      id: crypto.randomUUID(),
      type: newModifier.type,
      name: newModifier.name.trim(),
      priceAdjustment: parseFloat(newModifier.priceAdjustment),
    };
    
    onChange([...modifiers, modifier]);
    setNewModifier({ type: 'size', name: '', priceAdjustment: '' });
    setErrors({});
  };
  
  const handleRemoveModifier = (id: string) => {
    onChange(modifiers.filter(m => m.id !== id));
  };
  
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-zinc-300">Modifiers</h4>
      
      {modifiers.length > 0 && (
        <div className="space-y-2">
          {modifiers.map((modifier) => (
            <div
              key={modifier.id}
              className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wide text-zinc-500 bg-zinc-700 px-2 py-0.5 rounded">
                  {modifier.type}
                </span>
                <span className="text-zinc-200">{modifier.name}</span>
                <span className="text-zinc-400">
                  {modifier.priceAdjustment >= 0 ? '+' : ''}
                  ${modifier.priceAdjustment.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveModifier(modifier.id)}
                className="text-zinc-500 hover:text-red-400 transition-colors"
                aria-label={`Remove ${modifier.name}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
        <p className="text-sm text-zinc-400">Add new modifier</p>
        <div className="grid grid-cols-3 gap-3">
          <Select
            options={MODIFIER_TYPES}
            value={newModifier.type}
            onChange={(e) => setNewModifier({ ...newModifier, type: e.target.value as 'size' | 'milk' })}
          />
          <Input
            placeholder="Name"
            value={newModifier.name}
            onChange={(e) => setNewModifier({ ...newModifier, name: e.target.value })}
            error={errors.name}
          />
          <Input
            placeholder="+/- Price"
            type="number"
            step="0.01"
            value={newModifier.priceAdjustment}
            onChange={(e) => setNewModifier({ ...newModifier, priceAdjustment: e.target.value })}
            error={errors.priceAdjustment}
          />
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={handleAddModifier}>
          Add Modifier
        </Button>
      </div>
    </div>
  );
}