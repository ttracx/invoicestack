'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Download, Eye, Edit, Trash2 } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  total: number
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE'
  dueDate: string
  createdAt: string
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      // Mock data for now
      setInvoices([
        {
          id: '1',
          invoiceNumber: 'INV-001',
          clientName: 'Acme Corporation',
          total: 2500.00,
          status: 'SENT',
          dueDate: '2026-02-25',
          createdAt: '2026-02-10'
        },
        {
          id: '2',
          invoiceNumber: 'INV-002',
          clientName: 'Tech Solutions LLC',
          total: 1800.00,
          status: 'PAID',
          dueDate: '2026-02-20',
          createdAt: '2026-02-08'
        },
        {
          id: '3',
          invoiceNumber: 'INV-003',
          clientName: 'Creative Studio Inc',
          total: 3200.00,
          status: 'DRAFT',
          dueDate: '2026-03-01',
          createdAt: '2026-02-12'
        },
        {
          id: '4',
          invoiceNumber: 'INV-004',
          clientName: 'Marketing Agency',
          total: 4500.00,
          status: 'OVERDUE',
          dueDate: '2026-02-15',
          createdAt: '2026-02-05'
        }
      ])
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'SENT':
        return 'bg-blue-100 text-blue-800'
      case 'OVERDUE':
        return 'bg-red-100 text-red-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const generatePDF = (invoice: Invoice) => {
    // Import dynamically to avoid SSR issues
    import('@/lib/pdf').then(({ generateInvoicePDF }) => {
      const pdfData = {
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.createdAt,
        dueDate: invoice.dueDate,
        client: {
          name: invoice.clientName,
          email: 'client@example.com', // This would come from database
          address: '123 Client St\nCity, State 12345'
        },
        business: {
          name: 'Your Business Name',
          address: '456 Business Ave\nYour City, State 67890',
          email: 'your@business.com',
          phone: '(555) 123-4567'
        },
        items: [
          {
            description: 'Sample Service',
            quantity: 1,
            rate: invoice.total,
            amount: invoice.total
          }
        ],
        subtotal: invoice.total,
        taxRate: 0,
        taxAmount: 0,
        total: invoice.total,
        notes: 'Thank you for your business!'
      }
      
      generateInvoicePDF(pdfData)
    })
  }

  const deleteInvoice = (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(inv => inv.id !== id))
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <Link
          href="/dashboard/invoices/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${invoice.total.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => generatePDF(invoice)}
                        className="text-gray-600 hover:text-blue-600"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="text-gray-600 hover:text-blue-600"
                        title="View Invoice"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/dashboard/invoices/${invoice.id}/edit`}
                        className="text-gray-600 hover:text-yellow-600"
                        title="Edit Invoice"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteInvoice(invoice.id)}
                        className="text-gray-600 hover:text-red-600"
                        title="Delete Invoice"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {invoices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No invoices found</div>
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Invoice
          </Link>
        </div>
      )}
    </div>
  )
}