import jsPDF from 'jspdf'

interface InvoiceData {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  client: {
    name: string
    email: string
    address: string
  }
  business: {
    name: string
    address: string
    email: string
    phone?: string
  }
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  notes?: string
}

export function generateInvoicePDF(data: InvoiceData): void {
  const doc = new jsPDF()
  
  // Colors
  const primaryColor = '#2563eb' // blue-600
  const textColor = '#374151'    // gray-700
  const lightGray = '#f3f4f6'    // gray-100
  
  // Header
  doc.setFillColor(primaryColor)
  doc.rect(0, 0, 210, 25, 'F')
  
  doc.setTextColor('#ffffff')
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('INVOICE', 20, 17)
  
  // Reset text color
  doc.setTextColor(textColor)
  
  // Invoice details
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Invoice Number:', 20, 40)
  doc.setFont('helvetica', 'normal')
  doc.text(data.invoiceNumber, 70, 40)
  
  doc.setFont('helvetica', 'bold')
  doc.text('Issue Date:', 20, 48)
  doc.setFont('helvetica', 'normal')
  doc.text(data.issueDate, 70, 48)
  
  doc.setFont('helvetica', 'bold')
  doc.text('Due Date:', 20, 56)
  doc.setFont('helvetica', 'normal')
  doc.text(data.dueDate, 70, 56)
  
  // Business info (right side)
  doc.setFont('helvetica', 'bold')
  doc.text('From:', 120, 40)
  doc.setFont('helvetica', 'normal')
  const businessLines = [
    data.business.name,
    ...(data.business.address ? data.business.address.split('\n') : []),
    data.business.email,
    ...(data.business.phone ? [data.business.phone] : [])
  ]
  
  businessLines.forEach((line, index) => {
    doc.text(line, 120, 48 + (index * 6))
  })
  
  // Client info
  doc.setFont('helvetica', 'bold')
  doc.text('Bill To:', 20, 85)
  doc.setFont('helvetica', 'normal')
  const clientLines = [
    data.client.name,
    data.client.email,
    ...(data.client.address ? data.client.address.split('\n') : [])
  ]
  
  clientLines.forEach((line, index) => {
    doc.text(line, 20, 93 + (index * 6))
  })
  
  // Items table
  const tableStartY = 130
  let currentY = tableStartY
  
  // Table header
  doc.setFillColor(lightGray)
  doc.rect(20, currentY, 170, 10, 'F')
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Description', 22, currentY + 7)
  doc.text('Qty', 130, currentY + 7)
  doc.text('Rate', 150, currentY + 7)
  doc.text('Amount', 175, currentY + 7)
  
  currentY += 10
  
  // Table rows
  doc.setFont('helvetica', 'normal')
  data.items.forEach((item) => {
    // Handle long descriptions
    const description = doc.splitTextToSize(item.description, 100)
    const rowHeight = Math.max(8, description.length * 4)
    
    doc.text(description, 22, currentY + 5)
    doc.text(item.quantity.toString(), 130, currentY + 5)
    doc.text(`$${item.rate.toFixed(2)}`, 150, currentY + 5)
    doc.text(`$${item.amount.toFixed(2)}`, 175, currentY + 5)
    
    currentY += rowHeight
  })
  
  // Totals
  currentY += 10
  
  doc.setFont('helvetica', 'normal')
  doc.text('Subtotal:', 150, currentY)
  doc.text(`$${data.subtotal.toFixed(2)}`, 175, currentY)
  
  currentY += 8
  doc.text(`Tax (${data.taxRate}%):`, 150, currentY)
  doc.text(`$${data.taxAmount.toFixed(2)}`, 175, currentY)
  
  currentY += 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Total:', 150, currentY)
  doc.text(`$${data.total.toFixed(2)}`, 175, currentY)
  
  // Notes
  if (data.notes) {
    currentY += 20
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('Notes:', 20, currentY)
    
    currentY += 8
    doc.setFont('helvetica', 'normal')
    const notes = doc.splitTextToSize(data.notes, 170)
    doc.text(notes, 20, currentY)
  }
  
  // Footer
  const pageHeight = doc.internal.pageSize.height
  doc.setFontSize(8)
  doc.setTextColor('#666666')
  doc.text('© 2026 InvoiceStack powered by VibeCaaS.com a division of NeuralQuantum.ai LLC. All rights reserved.', 20, pageHeight - 10)
  
  // Download the PDF
  doc.save(`${data.invoiceNumber}.pdf`)
}