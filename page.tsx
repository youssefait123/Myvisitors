import RegistrationForm from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
                <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
                <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
                <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
                <rect width="7" height="7" x="7" y="7" rx="1"></rect>
                <path d="M10 10h1v1h-1z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-blue-600">MyVisitor</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Register for Your Event</h1>
          <RegistrationForm />
        </div>
      </main>

      <footer className="bg-gray-50 border-t mt-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MyVisitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
