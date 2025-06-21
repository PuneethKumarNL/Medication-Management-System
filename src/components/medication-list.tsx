"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trash2, Clock } from "lucide-react"

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  takenToday: boolean
  lastTaken?: Date
}

interface MedicationListProps {
  medications: Medication[]
  onMarkAsTaken: (id: string) => void
  onMarkAsNotTaken: (id: string) => void
  onDelete: (id: string) => void
}

export function MedicationList({ medications, onMarkAsTaken, onMarkAsNotTaken, onDelete }: MedicationListProps) {
  const formatLastTaken = (date?: Date) => {
    if (!date) return "Not taken today"
    return `Taken at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Medication List</CardTitle>
      </CardHeader>
      <CardContent>
        {medications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No medications added yet. Click "Add Medication" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                    <Badge variant={medication.takenToday ? "default" : "secondary"}>
                      {medication.takenToday ? "Taken" : "Pending"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Dosage:</span> {medication.dosage}
                    </p>
                    <p>
                      <span className="font-medium">Frequency:</span> {medication.frequency}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{formatLastTaken(medication.lastTaken)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {medication.takenToday ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onMarkAsNotTaken(medication.id)}
                      className="bg-white text-gray-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Undo
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => onMarkAsTaken(medication.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Mark Taken
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(medication.id)}
                    className="bg-white text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
