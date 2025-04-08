"use client"

import type React from "react"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    establishment: "",
  })

  const [showQR, setShowQR] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowQR(true)
  }

  const downloadQRCode = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector("svg")
    if (!svg) return

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 256
    canvas.height = 256

    // Create an image from the SVG
    const img = new Image()
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0)

      // Convert canvas to data URL and trigger download
      const pngUrl = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `${formData.firstName}-${formData.lastName}-qrcode.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(url)
    }

    img.src = url
    img.crossOrigin = "anonymous"
  }

  const qrCodeData = JSON.stringify({
    firstName: formData.firstName,
    lastName: formData.lastName,
    establishment: formData.establishment,
    timestamp: new Date().toISOString(),
  })

  return (
    <Card className="p-6">
      {!showQR ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="establishment">Establishment</Label>
            <Input
              id="establishment"
              name="establishment"
              value={formData.establishment}
              onChange={handleChange}
              required
              placeholder="Enter your establishment"
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      ) : (
        <div className="space-y-6 text-center">
          <h2 className="text-xl font-semibold">Registration Complete!</h2>
          <p className="text-gray-600">
            Thank you, {formData.firstName} {formData.lastName} from {formData.establishment}
          </p>

          <div className="flex justify-center" ref={qrRef}>
            <QRCodeSVG value={qrCodeData} size={200} level="H" includeMargin={true} />
          </div>

          <div className="space-y-3">
            <Button onClick={downloadQRCode} className="w-full">
              Download QR Code
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowQR(false)
                setFormData({ firstName: "", lastName: "", establishment: "" })
              }}
              className="w-full"
            >
              Register Another Person
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
