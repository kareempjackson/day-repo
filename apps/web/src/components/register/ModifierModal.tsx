'use client';

import { useState, useCallback } from 'react';
import { MenuItem } from '@/types/menu';

interface ModifierModalProps {
  item: MenuItem;
  onConfirm: (modifiers: Record<string, string>) => void;
  onCancel: () => void;
}

export function ModifierModal({ item, onConfirm, onCancel }: ModifierModalProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    item.modifiers?.forEach(mod => {
      const defaultOption = mod.options.find(o => o.isDefault) || mod.options[0];
      if (defaultOption) {
        initial[mod.type] = defaultOption.name;
      }
    });
    return initial;
  });

  const handleModifierSelect = useCallback((type: string, value: string) => {
    setSelectedModifiers(prev => ({ ...prev, [type]: value }));
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(selectedModifiers);
  }, [selectedModifiers, onConfirm]);

  const getCurrentPrice = useCallback(() => {
    let price = item.basePrice;
    const sizeModifier = item.modifiers?.find(m => m.type === 'size');
    if (sizeModifier && selectedModifiers.size) {
      const selectedOption = sizeModifier.options.find(o => o.name === selectedModifiers.size);
      if (selectedOption) {
        price = selectedOption.priceAdjustment;
      }
    }
    return price;
  }, [item, selectedModifiers]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onCancel}>
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-2xl border border-zinc-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-100">{item.name}</h3>
          <p className="text-amber-500 font-semibold mt-1">${getCurrentPrice().toFixed(2)}</p>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {item.modifiers?.map(modifier => (
            <div key={modifier.type}>
              <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-3">
                {modifier.type === 'size' ? 'Size' : modifier.type === 'milk' ? 'Milk' : modifier.type}
                {modifier.required && <span className="text-red-400 ml-1">*</span>}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {modifier.options.map(option => {
                  const isSelected = selectedModifiers[modifier.type] === option.name;
                  return (
                    <button
                      key={option.name}
                      onClick={() => handleModifierSelect(modifier.type, option.name)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white border-2 border-amber-500'
                          : 'bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <span className="font-medium">{option.name}</span>
                      {modifier.type === 'size' && (
                        <span className="block text-sm mt-1 opacity-80">
                          ${option.priceAdjustment.toFixed(2)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-colors"
          >
            Add ${getCurrentPrice().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
