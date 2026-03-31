"use client"

import { useState, useEffect } from "react"
import { Mail, MessageSquare, Check, Clock, AlertCircle, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export const dynamic = 'force-dynamic'

type Quote = {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  productType?: string
  quantity?: string
  budget?: string
  status: "PENDING" | "REVIEWING" | "REPLIED" | "CLOSED"
  createdAt: string
  replies: any[]
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [sendingReply, setSendingReply] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"ALL" | Quote["status"]>("ALL")

  useEffect(() => {
    // Load quotes from API
    const loadQuotes = async () => {
      try {
        // For demo, create mock data
        const mockQuotes: Quote[] = [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            company: "ABC Corp",
            phone: "+1-234-567-8900",
            message: "Interested in LED display solutions for our office",
            productType: "Indoor LED Display",
            quantity: "5",
            budget: "$50,000",
            status: "PENDING",
            createdAt: new Date().toISOString(),
            replies: [],
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            company: "XYZ Inc",
            phone: "+1-234-567-8901",
            message: "Need outdoor LED screens for storefront",
            productType: "Outdoor LED Display",
            quantity: "3",
            budget: "$75,000",
            status: "REVIEWING",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            replies: [],
          },
        ]
        setQuotes(mockQuotes)
      } catch (error) {
        console.error("Failed to load quotes:", error)
      } finally {
        setLoading(false)
      }
    }

    loadQuotes()
  }, [])

  const handleSendReply = async () => {
    if (!selectedQuote || !replyMessage.trim()) return

    setSendingReply(true)
    try {
      const response = await fetch(`/api/v1/quotes/${selectedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "REPLIED",
          replyMessage,
          replyTo: selectedQuote.email,
        }),
      })

      if (response.ok) {
        // Update local state
        setQuotes(
          quotes.map((q) =>
            q.id === selectedQuote.id
              ? {
                  ...q,
                  status: "REPLIED",
                  replies: [
                    ...q.replies,
                    {
                      from: "admin",
                      message: replyMessage,
                      sentAt: new Date().toISOString(),
                    },
                  ],
                }
              : q
          )
        )
        setSelectedQuote(null)
        setReplyMessage("")
      }
    } catch (error) {
      console.error("Failed to send reply:", error)
    } finally {
      setSendingReply(false)
    }
  }

  const getStatusIcon = (status: Quote["status"]) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "REVIEWING":
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      case "REPLIED":
        return <Check className="w-4 h-4 text-green-500" />
      case "CLOSED":
        return <Check className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredQuotes = filterStatus === "ALL" ? quotes : quotes.filter((q) => q.status === filterStatus)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quote Requests</h1>
        <p className="text-muted-foreground">Manage customer quote inquiries</p>
      </div>

      <div className="flex gap-2">
        {(["ALL", "PENDING", "REVIEWING", "REPLIED", "CLOSED"] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? "default" : "outline"}
            onClick={() => setFilterStatus(status)}
            className="text-sm"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quotes List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredQuotes.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No quotes found</p>
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card
                key={quote.id}
                className={`cursor-pointer hover:bg-card/80 transition-colors ${
                  selectedQuote?.id === quote.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedQuote(quote)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground truncate">{quote.name}</h3>
                        <span className="flex items-center gap-1 text-xs">
                          {getStatusIcon(quote.status)}
                          {quote.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {quote.email}
                      </p>
                      {quote.company && (
                        <p className="text-sm text-muted-foreground">{quote.company}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {quote.message}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground flex-shrink-0">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quote Details & Reply */}
        <div>
          {selectedQuote ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quote Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-foreground">{selectedQuote.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-foreground break-all">{selectedQuote.email}</p>
                </div>
                {selectedQuote.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-foreground">{selectedQuote.phone}</p>
                  </div>
                )}
                {selectedQuote.company && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p className="text-foreground">{selectedQuote.company}</p>
                  </div>
                )}
                {selectedQuote.productType && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Product Type</p>
                    <p className="text-foreground">{selectedQuote.productType}</p>
                  </div>
                )}
                {selectedQuote.quantity && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                    <p className="text-foreground">{selectedQuote.quantity}</p>
                  </div>
                )}
                {selectedQuote.budget && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget</p>
                    <p className="text-foreground">{selectedQuote.budget}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                  <p className="text-sm text-foreground">{selectedQuote.message}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <label className="text-sm font-medium text-muted-foreground block">
                    Send Reply via Email
                  </label>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="text-sm"
                    rows={4}
                  />
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim() || sendingReply}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {sendingReply ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply & Email
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Select a quote to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
