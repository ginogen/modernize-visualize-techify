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
  const [localNumberOfPayments, setLocalNumberOfPayments] = useState(numberOfPayments);
  const [isInitialized, setIsInitialized] = useState(false);
  const [previousNumberOfPayments, setPreviousNumberOfPayments] = useState(numberOfPayments);

  useEffect(() => {
    setLocalNumberOfPayments(numberOfPayments);
  }, [numberOfPayments]);

  useEffect(() => {
    if (paymentSchedule && paymentSchedule.trim() !== "" && !isInitialized) {
      const details = paymentSchedule.split("\n").filter(line => line.trim() !== "");
      setPaymentDetails(details);
      setIsInitialized(true);
      
      if (details.length > 0 && numberOfPayments !== details.length) {
        onNumberOfPaymentsChange(details.length);
      }
    }
  }, [paymentSchedule, numberOfPayments, onNumberOfPaymentsChange, isInitialized]);

  useEffect(() => {
    if (investment && numberOfPayments > 0 && previousNumberOfPayments !== numberOfPayments) {
      try {
        const numericValue = parseFloat(investment.replace(/[^\d.-]/g, ""));
        
        if (!isNaN(numericValue)) {
          const amountPerPayment = Math.round(numericValue / numberOfPayments).toString();
          
          const newPaymentDetails = Array(numberOfPayments)
            .fill("")
            .map((_, index) => `Pago ${index + 1}: $${amountPerPayment}`);
          
          setPaymentDetails(newPaymentDetails);
          setPreviousNumberOfPayments(numberOfPayments);
        }
      } catch (error) {
        console.error("Error recalculating payment amounts:", error);
      }
    }
  }, [investment, numberOfPayments, previousNumberOfPayments]);

  useEffect(() => {
    if (paymentDetails.length > 0) {
      onPaymentScheduleChange(paymentDetails.join("\n"));
    }
  }, [paymentDetails, onPaymentScheduleChange]);

  const handlePaymentDetailChange = (index: number, value: string) => {
    const updatedDetails = [...paymentDetails];
    updatedDetails[index] = value;
    setPaymentDetails(updatedDetails);
  };

  const handleNumberOfPaymentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setLocalNumberOfPayments(value);
      onNumberOfPaymentsChange(value);
    }
  };

  const addPayment = () => {
    setPaymentDetails([...paymentDetails, ""]);
    onNumberOfPaymentsChange(paymentDetails.length + 1);
  };

  const removePayment = (index: number) => {
    if (paymentDetails.length > 1) {
      const updatedDetails = paymentDetails.filter((_, i) => i !== index);
      setPaymentDetails(updatedDetails);
      onNumberOfPaymentsChange(updatedDetails.length);
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
          value={localNumberOfPayments}
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
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePayment(index)}
                disabled={paymentDetails.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPayment}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar Pago
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsFields;
