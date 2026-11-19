// Merangkai halaman utama LaundryCalc (FT-01 s.d. FT-06) dengan state kalkulasi langsung dan validasi sebelum mengirim ke WhatsApp.

import { type MouseEvent, useMemo, useRef, useState } from 'react';
import { AddOnOptions } from './components/AddOnOptions';
import { CustomerOrderForm } from './components/CustomerOrderForm';
import { ServiceCatalog } from './components/ServiceCatalog';
import { StickySummaryBar } from './components/StickySummaryBar';
import { WeightInput } from './components/WeightInput';
import { APP_CONFIG, STORE_INFO, type ServiceCode } from './config';
import { calculateLaundryEstimate } from './lib/calculator';
import { type OrderFormErrors, validateOrderForm } from './lib/validation';
import { buildWhatsAppUrl } from './lib/whatsapp';

export default function App() {
  const [serviceCode, setServiceCode] = useState<ServiceCode>(APP_CONFIG.defaultServiceCode);
  const [weightInput, setWeightInput] = useState<string>(String(APP_CONFIG.defaultWeightKg));
  const [hasDelivery, setHasDelivery] = useState<boolean>(false);
  const [hasPremiumFragrance, setHasPremiumFragrance] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [errors, setErrors] = useState<OrderFormErrors>({});

  const weightInputRef = useRef<HTMLInputElement>(null);
  const customerNameRef = useRef<HTMLInputElement>(null);
  const pickupAddressRef = useRef<HTMLTextAreaElement>(null);

  const estimate = useMemo(
    () =>
      calculateLaundryEstimate({
        serviceCode,
        weightInput,
        hasDelivery,
        hasPremiumFragrance,
      }),
    [serviceCode, weightInput, hasDelivery, hasPremiumFragrance],
  );

  const whatsAppUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        customerName,
        hasDelivery,
        hasPremiumFragrance,
        pickupAddress,
        specialNotes,
        estimate,
      }),
    [customerName, hasDelivery, hasPremiumFragrance, pickupAddress, specialNotes, estimate],
  );

  const handleWeightChange = (nextValue: string) => {
    setWeightInput(nextValue);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
  };

  const handleNameChange = (nextValue: string) => {
    setCustomerName(nextValue);
    if (errors.customerName) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  const handleAddressChange = (nextValue: string) => {
    setPickupAddress(nextValue);
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleToggleDelivery = (checked: boolean) => {
    setHasDelivery(checked);
    if (!checked && errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleAttemptSubmit = (event: MouseEvent<HTMLAnchorElement>) => {
    const validation = validateOrderForm({
      weightInput,
      hasDelivery,
      customerName,
      pickupAddress,
    });

    if (!validation.isValid) {
      event.preventDefault();
      setErrors(validation.errors);

      if (validation.firstErrorField === 'weight') {
        weightInputRef.current?.focus();
      } else if (validation.firstErrorField === 'customerName') {
        customerNameRef.current?.focus();
      } else if (validation.firstErrorField === 'pickupAddress') {
        pickupAddressRef.current?.focus();
      }
      return;
    }

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900 whitespace-nowrap">
            {STORE_INFO.appTitle}
          </h1>
          <span className="text-sm text-neutral-600 whitespace-nowrap">{STORE_INFO.name}</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-40 sm:px-6 sm:pb-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="space-y-6 lg:col-span-7">
            <ServiceCatalog selectedCode={serviceCode} onSelect={setServiceCode} />

            <WeightInput
              value={weightInput}
              billedWeight={estimate.billedWeight}
              isMinimumChargeApplied={estimate.isMinimumChargeApplied}
              error={errors.weight}
              inputRef={weightInputRef}
              onChange={handleWeightChange}
            />

            <AddOnOptions
              hasDelivery={hasDelivery}
              hasPremiumFragrance={hasPremiumFragrance}
              fragranceCost={estimate.fragranceCost}
              onToggleDelivery={handleToggleDelivery}
              onToggleFragrance={setHasPremiumFragrance}
            />
          </div>

          <div className="lg:col-span-5">
            <CustomerOrderForm
              customerName={customerName}
              pickupAddress={pickupAddress}
              specialNotes={specialNotes}
              hasDelivery={hasDelivery}
              errors={errors}
              customerNameRef={customerNameRef}
              pickupAddressRef={pickupAddressRef}
              onChangeName={handleNameChange}
              onChangeAddress={handleAddressChange}
              onChangeNotes={setSpecialNotes}
            />
          </div>
        </div>
      </main>

      <StickySummaryBar
        estimate={estimate}
        whatsAppUrl={whatsAppUrl}
        onAttemptSubmit={handleAttemptSubmit}
      />
    </div>
  );
}
