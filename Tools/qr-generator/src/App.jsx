import QRCodeGenerator from './QRCodeGenerator.jsx'

function App() {
  return (
    <div className="min-h-screen bg-[#FBFBFF] flex items-start justify-center p-6 pt-10 md:pt-16 lg:pt-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#25282B 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-10 w-full">
        <QRCodeGenerator />
      </div>
    </div>
  )
}

export default App
