import contratoModel from '../models/contratoModel.js'; // Importa el modelo de contrato

// Crear un contrato
export const createContrato = async (req, res) => {
    try {
        const data = new contratoModel(req.body);
        await data.save();
        res.json({ success: true, message: "Contrato guardado exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear el contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener todos los contratos
export const getAllContratos = async (req, res) => {
    try {
        const data = await contratoModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los contratos:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener un contrato por su ID
export const getContratoById = async (req, res) => {
    const contratoId = req.params.id;

    try {
        const contrato = await contratoModel.findById(contratoId);
        if (!contrato) {
            return res.status(404).json({ success: false, message: "Contrato no encontrado" });
        }
        res.json({ success: true, data: contrato });
    } catch (error) {
        console.error("Error al obtener el contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Actualizar un contrato por su ID
export const updateContrato = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    try {
        const data = await contratoModel.findOneAndUpdate({ _id: id }, newData, { new: true, omitUndefined: true });
        res.json({ success: true, message: "Datos de contrato actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos de contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Eliminar un contrato por su ID
export const deleteContrato = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await contratoModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Contrato eliminado exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar el contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};
// Agregar un horario a un contrato por su ID
export const addHorarioToContrato = async (req, res) => {
    const contratoId = req.params.id;
    const { Numero, HoraInicial, HoraFinal } = req.body;

    try {
        const contrato = await contratoModel.findById(contratoId);
        if (!contrato) {
            return res.status(404).json({ success: false, message: "Contrato no encontrado" });
        }

        // Agregar el nuevo horario al arreglo de turnos del contrato
        contrato.Turno.push({ Numero, HoraInicial, HoraFinal });
        await contrato.save();

        res.json({ success: true, message: "Horario agregado al contrato exitosamente", data: contrato });
    } catch (error) {
        console.error("Error al agregar el horario al contrato:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

