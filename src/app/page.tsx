'use client'

import Link from 'next/link'
import { CheckCircle, FileText, Users, CreditCard, Download, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">InvoiceStack</h1>
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Invoicing Made Simple
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate beautiful invoices, track payments, manage clients, and export PDFs—all for just $9.99/month.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
          >
            Start Free Trial
            <Zap className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Professional Invoices</h3>
            <p className="text-gray-600">
              Create stunning invoices with customizable templates and automatic calculations.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Client Management</h3>
            <p className="text-gray-600">
              Store client information and track all invoices in one organized dashboard.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Download className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">PDF Export</h3>
            <p className="text-gray-600">
              Export invoices as professional PDFs ready for email or printing.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Simple Pricing</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">$9.99</span>
              <span className="text-gray-600 text-xl">/month</span>
            </div>
            
            <ul className="text-left mb-8 space-y-3">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Unlimited invoices
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Unlimited clients
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                PDF export
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Payment tracking
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Email support
              </li>
            </ul>
            
            <Link
              href="/register"
              className="w-full inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Start Your Free Trial
            </Link>
            <p className="text-sm text-gray-500 mt-3">No credit card required</p>
          </div>
        </div>
      </div>
    </div>
  )
}