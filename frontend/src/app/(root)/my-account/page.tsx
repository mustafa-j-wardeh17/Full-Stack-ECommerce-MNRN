import React from 'react'

const page = () => {
  return (
    <div className="w-full mx-auto bg-white  rounded-lg">
      <div className="flex gap-6">
        <div className="w-1/4 border-r bg-gray-50">
          <nav className="flex flex-col">
            <a
              href="#"
              className="py-3 px-5 text-gray-700 hover:bg-primary hover:text-secondary transition duration-200"
            >
              Account Details
            </a>
            <a
              href="#"
              className="py-3 px-5 text-gray-700 hover:bg-primary hover:text-secondary transition duration-200"
            >
              All Orders
            </a>
            <a
              href="#"
              className="py-3 px-5 text-gray-700 hover:bg-primary hover:text-secondary transition duration-200"
            >
              Logout
            </a>
          </nav>
        </div>

        <div className="w-3/4 p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Account Details</h2>
              <p className="mt-2 text-gray-600">
                Here you can update your account information and manage your
                profile settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">All Orders</h2>
              <p className="mt-2 text-gray-600">
                View your order history and check the status of your recent
                orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page