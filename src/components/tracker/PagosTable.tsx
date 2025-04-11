import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, addDays, isAfter, isBefore, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Plus } from "lucide-react"

type Cliente = Database["public"]["Tables"]["clientes"]["Row"]
type Pago = Database["public"]["Tables"]["pagos"]["Row"]

type EditingPago = {
  descripcion: string
  cliente_id: string
  fecha_pago: string
  isNew?: boolean
}

export function PagosTable() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [pagos, setPagos] = useState<Pago[]>([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [editingPago, setEditingPago] = useState<EditingPago | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchClientes()
    fetchPagos()
  }, [])

  const fetchClientes = async () => {
    const { data: session } = await supabase.auth.getSession()
    if (!session.session?.user.id) return

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("user_id", session.session.user.id)
      .order("nombre")

    if (!error && data) {
      setClientes(data)
    }
  }

  const fetchPagos = async () => {
    const { data: session } = await supabase.auth.getSession()
    if (!session.session?.user.id) return

    const { data, error } = await supabase
      .from("pagos")
      .select(`
        *,
        clientes:cliente_id(nombre, color)
      `)
      .eq("user_id", session.session.user.id)
      .order("fecha_pago", { ascending: true })

    if (!error && data) {
      setPagos(data)
    }
  }

  const handleStartEdit = (pago?: Pago) => {
    if (pago) {
      setEditingId(pago.id)
      setEditingPago({
        descripcion: pago.descripcion,
        cliente_id: pago.cliente_id,
        fecha_pago: pago.fecha_pago,
      })
    } else {
      setEditingId("new")
      setEditingPago({
        descripcion: "",
        cliente_id: "",
        fecha_pago: format(new Date(), "yyyy-MM-dd"),
        isNew: true,
      })
    }
  }

  const handleSave = async () => {
    if (!editingPago) return

    const { data: session } = await supabase.auth.getSession()
    if (!session.session?.user.id) return

    if (editingPago.isNew) {
      const { error } = await supabase.from("pagos").insert({
        descripcion: editingPago.descripcion,
        cliente_id: editingPago.cliente_id,
        fecha_pago: editingPago.fecha_pago,
        monto: 0,
        estado: "pendiente",
        user_id: session.session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (!error) {
        setEditingPago(null)
        setEditingId(null)
        fetchPagos()
      }
    } else if (editingId) {
      const { error } = await supabase
        .from("pagos")
        .update({
          descripcion: editingPago.descripcion,
          cliente_id: editingPago.cliente_id,
          fecha_pago: editingPago.fecha_pago,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId)

      if (!error) {
        setEditingPago(null)
        setEditingId(null)
        fetchPagos()
      }
    }
  }

  const handleCancel = () => {
    setEditingPago(null)
    setEditingId(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  const handleToggleStatus = async (pago: Pago) => {
    const newStatus = pago.estado === "pendiente" ? "completado" : "pendiente"
    const { error } = await supabase
      .from("pagos")
      .update({ estado: newStatus })
      .eq("id", pago.id)

    if (!error) {
      fetchPagos()
    }
  }

  const handleDeletePago = async (id: string) => {
    const { error } = await supabase.from("pagos").delete().eq("id", id)

    if (!error) {
      fetchPagos()
    }
  }

  const filteredPagos = pagos.filter((pago) =>
    showCompleted ? pago.estado === "completado" : pago.estado === "pendiente"
  )

  const getStatusText = (pago: Pago) => {
    const fecha = parseISO(pago.fecha_pago)
    const today = new Date()

    if (isAfter(fecha, today)) {
      const daysLeft = Math.ceil(
        (fecha.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
      return `(${daysLeft} días restantes)`
    } else if (isBefore(fecha, today)) {
      const daysAgo = Math.ceil(
        (today.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24)
      )
      return `(Vencida hace ${daysAgo} días)`
    }
    return "(Hoy)"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tareas</h2>
        <div className="flex gap-2">
          <Button
            variant={showCompleted ? "outline" : "default"}
            onClick={() => setShowCompleted(false)}
          >
            Pendientes
          </Button>
          <Button
            variant={showCompleted ? "default" : "outline"}
            onClick={() => setShowCompleted(true)}
          >
            Completadas
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha Estimada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPagos.map((pago) => (
              <TableRow
                key={pago.id}
                className={editingId === pago.id ? "bg-muted" : "hover:bg-muted/50 cursor-pointer"}
                onClick={() => !editingId && handleStartEdit(pago)}
              >
                {editingId === pago.id ? (
                  <>
                    <TableCell>
                      <Input
                        value={editingPago?.descripcion}
                        onChange={(e) =>
                          setEditingPago({
                            ...editingPago!,
                            descripcion: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editingPago?.cliente_id}
                        onValueChange={(value) =>
                          setEditingPago({
                            ...editingPago!,
                            cliente_id: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map((cliente) => (
                            <SelectItem key={cliente.id} value={cliente.id}>
                              {cliente.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={editingPago?.fecha_pago}
                        onChange={(e) =>
                          setEditingPago({
                            ...editingPago!,
                            fecha_pago: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyDown}
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={pago.estado === "completado"}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleToggleStatus(pago)
                        }}
                        className="w-4 h-4 rounded-full border-2"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span
                        className={
                          pago.estado === "completado" ? "line-through text-gray-500" : ""
                        }
                      >
                        {pago.descripcion}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div
                        className="w-2 h-2 rounded-full inline-block mr-2"
                        style={{
                          backgroundColor: (pago as any).clientes?.color || "#ccc",
                        }}
                      />
                      {(pago as any).clientes?.nombre || "Sin cliente"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{format(parseISO(pago.fecha_pago), "dd/MM/yyyy")}</span>
                        <span className="text-gray-500 text-sm">
                          {getStatusText(pago)}
                        </span>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
            {!showCompleted && (
              <TableRow
                className={
                  editingId === "new"
                    ? "bg-muted"
                    : "hover:bg-muted/50 cursor-pointer text-muted-foreground"
                }
                onClick={() => !editingId && handleStartEdit()}
              >
                {editingId === "new" ? (
                  <>
                    <TableCell>
                      <Input
                        value={editingPago?.descripcion}
                        onChange={(e) =>
                          setEditingPago({
                            ...editingPago!,
                            descripcion: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editingPago?.cliente_id}
                        onValueChange={(value) =>
                          setEditingPago({
                            ...editingPago!,
                            cliente_id: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map((cliente) => (
                            <SelectItem key={cliente.id} value={cliente.id}>
                              {cliente.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={editingPago?.fecha_pago}
                        onChange={(e) =>
                          setEditingPago({
                            ...editingPago!,
                            fecha_pago: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyDown}
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Agregar nueva tarea...
                      </span>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 