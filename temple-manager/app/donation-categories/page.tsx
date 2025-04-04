import { Metadata } from 'next'
import DonationCategoriesTable from '@/app/components/DonationCategoriesTable'

export const metadata: Metadata = {
  title: 'Donation Categories',
  description: 'Manage donation categories',
}

export default function DonationCategoriesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Donation Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all donation categories in the temple
          </p>
        </div>
      </div>
      <DonationCategoriesTable />
    </div>
  )
} 