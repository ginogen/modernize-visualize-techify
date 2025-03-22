
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import TemplateSelector from "@/components/admin/TemplateSelector";

type PaymentDetailsProps = {
  investment: string;
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  paymentSchedule: string;
  onPaymentScheduleChange: (value: string) => void;
  numberOfPayments: number;
  onNumberOfPaymentsChange: (value: number) => void;
};

const PaymentDetailsFields = ({
  investment,
  paymentMethod,
  onPaymentMethodChange,
  paymentSchedule,
  onPaymentScheduleChange,
  numberOfPayments,
  onNumberOfPaymentsChange,
}: PaymentDetailsProps) => {
  const [paymentDetails, setPaymentDetails] = useState<string[]>([]);

  // Calculate payment amounts when investment or number of payments changes
  useEffect(() => {
    if (investment && numberOfPayments > 0) {
      try {
        // Extract numeric value from investment (removing currency and formatting)
        const numericValue = parseFloat(investment.replace(/[^\d.-]/g, ""));
        
        if (!isNaN(numericValue)) {
          const amountPerPayment = (numericValue / numberOfPayments).toFixed(2);
          
          // Generate payment details
          const newPaymentDetails = Array(numberOfPayments)
            .fill("")
            .map((_, index) => 
              paymentDetails[index] || `Pago ${index + 1}: $${amountPerPayment}`
            );
          
          setPaymentDetails(newPaymentDetails);
        }
      } catch (error) {
        console.error("Error calculating payment amounts:", error);
      }
    }
  }, [investment, numberOfPayments]);

  // Update payment schedule text when payment details change
  useEffect(() => {
    if (paymentDetails.length > 0) {
      onPaymentScheduleChange(paymentDetails.join("\n"));
    }
  }, [paymentDetails, onPaymentScheduleChange]);

  // Initialize payment details from existing payment schedule
  useEffect(() => {
    if (paymentSchedule && paymentSchedule.trim() !== "") {
      const details = paymentSchedule.split("\n").filter(line => line.trim() !== "");
      setPaymentDetails(details);
      if (details.length > 0 && numberOfPayments !== details.length) {
        onNumberOfPaymentsChange(details.length);
      }
    }
  }, [paymentSchedule, numberOfPayments, onNumberOfPaymentsChange]);

  const handlePaymentDetailChange = (index: number, value: string) => {
    const updatedDetails = [...paymentDetails];
    updatedDetails[index] = value;
    setPaymentDetails(updatedDetails);
  };

  const handleNumberOfPaymentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onNumberOfPaymentsChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="numberOfPayments">Número de Pagos</Label>
        </div>
        <Input
          id="numberOfPayments"
          name="numberOfPayments"
          type="number"
          min="1"
          value={numberOfPayments}
          onChange={handleNumberOfPaymentsChange}
          placeholder="Número de pagos"
        />
        <p className="text-sm text-muted-foreground">
          La inversión de {investment} se dividirá en {numberOfPayments} pago(s)
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="paymentMethod">Modalidad de Pago</Label>
          <TemplateSelector 
            fieldType="payment_method"
            value={paymentMethod}
            onChange={onPaymentMethodChange}
          />
        </div>
        <Input
          id="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
          placeholder="50% inicial, 50% al finalizar"
        />
      </div>

      {numberOfPayments > 0 && (
        <div className="space-y-2">
          <Label>Detalle de Pagos</Label>
          <p className="text-sm text-muted-foreground">
            Especifique cuándo se realizará cada pago
          </p>
          
          {paymentDetails.map((detail, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  placeholder={`Pago ${index + 1}`}
                  value={detail}
                  onChange={(e) => handlePaymentDetailChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsFields;
