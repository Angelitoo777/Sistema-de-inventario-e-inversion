import { z } from 'zod';

const detailSaleSchema = z.object({
    description: z.string({
        required_error: "La descripción del producto es requerida"
    }).min(1, "La descripción no puede estar vacía"),

    quantity: z.number({
        required_error: "La cantidad es requerida"
    }).int("La cantidad debe ser un entero")
        .positive("La cantidad debe ser mayor a 0"),

    price_unitary: z.number({
        required_error: "El precio de venta es requerido"
    }).min(0, "El precio no puede ser negativo"),

    cost_unitary: z.number({
        required_error: "El costo de venta es requerido"
    }).min(0, "El costo no puede ser negativo")
});


const saleSchema = z.object({
    clientId: z.string().uuid("...").nullable().optional(),
    status: z.enum(['pagado', 'pendiente'], { required_error: "El estado de pago ('pagado' o 'pendiente') es requerido" }),
    details: z.array(detailSaleSchema).min(1, "La venta debe tener al menos un producto")

}).superRefine((data, ctx) => {

    if (data.status === 'pendiente' && !data.clientId) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Se requiere un 'clientId' para las ventas con estado 'pendiente'",
            path: ['clientId']
        });
    }
});

export const validateSale = (saleData) => {
    return saleSchema.safeParse(saleData);
};