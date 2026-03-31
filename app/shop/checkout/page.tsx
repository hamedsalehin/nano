'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster, toast } from 'sonner'

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
  })
  const [processing, setProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful!')
      router.push('/shop/order-confirmation')
      setProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </header>

      {/* Checkout Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-2xl">
          {/* Payment Form */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Details</h2>
              
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Cardholder Name</label>
                  <Input
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Card Number</label>
                  <Input
                    name="cardNumber"
                    placeholder="4532 1234 5678 9010"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <Input
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Billing Address</label>
                  <Input
                    name="billingAddress"
                    placeholder="123 Main St"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input
                      name="billingCity"
                      placeholder="New York"
                      value={formData.billingCity}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">ZIP Code</label>
                    <Input
                      name="billingZip"
                      placeholder="10001"
                      value={formData.billingZip}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-6"
                  size="lg"
                >
                  {processing ? 'Processing...' : 'Complete Payment'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$4,999.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$400.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total</span>
                  <span>$5,399.00</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                This is a demo checkout. No actual payment will be processed.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
