"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Power, Plus, Minus, Thermometer } from "lucide-react"

export default function ACRemote() {
  const [isOn, setIsOn] = useState(false)
  const [temperature, setTemperature] = useState(22)
  const [isLoading, setIsLoading] = useState(false)

  const minTemp = 16
  const maxTemp = 30

const NODEMCU_IP = "https://desired-legal-doe.ngrok-free.app"; // replace with your ESP IP

const handlePowerToggle = async () => {
  setIsLoading(true)
  await fetch(`${NODEMCU_IP}/power`)
  setIsOn(!isOn)
  setIsLoading(false)
}

const handleTempChange = async (newTemp: number) => {
  if (newTemp < minTemp || newTemp > maxTemp) return
  setIsLoading(true)
  await fetch(`${NODEMCU_IP}/temp?value=${newTemp}`)
  setTemperature(newTemp)
  setIsLoading(false)
}

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">

        {/* Main Control Card */}
        <Card className="p-6 space-y-6 border-border">
          {/* Status Indicator */}
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                isOn ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isOn ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
              {isOn ? "Running" : "Off"}
            </div>
          </div>

          {/* Temperature Display */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Thermometer className="w-5 h-5" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="text-5xl font-bold text-foreground">{temperature}°</div>
            <div className="text-sm text-muted-foreground">
              Range: {minTemp}° - {maxTemp}°
            </div>
          </div>

          {/* Temperature Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full bg-transparent"
              onClick={() => handleTempChange(temperature - 1)}
              disabled={temperature <= minTemp || isLoading || !isOn}
            >
              <Minus className="w-6 h-6" />
            </Button>

            <div className="text-center min-w-[80px]">
              <div className="text-lg font-semibold text-foreground">{temperature}°C</div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full bg-transparent"
              onClick={() => handleTempChange(temperature + 1)}
              disabled={temperature >= maxTemp || isLoading || !isOn}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>

          {/* Power Button */}
          <div className="pt-4">
            <Button
              onClick={handlePowerToggle}
              disabled={isLoading}
              className={`w-full h-16 text-lg font-semibold rounded-xl transition-all ${
                isOn
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              <Power className="w-6 h-6 mr-2" />
              {isLoading ? "Loading..." : isOn ? "Turn Off" : "Turn On"}
            </Button>
          </div>
        </Card>

        {/* Quick Settings */}
        <Card className="p-4 border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Settings</h3>
          <div className="grid grid-cols-3 gap-2">
            {[18, 22, 26].map((temp) => (
              <Button
                key={temp}
                variant="outline"
                size="sm"
                onClick={() => handleTempChange(temp)}
                disabled={isLoading || !isOn}
                className={`border-border hover:bg-primary/10 hover:border-primary/50 ${
                  temperature === temp ? "bg-primary/20 border-primary text-primary" : ""
                }`}
              >
                {temp}°
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
