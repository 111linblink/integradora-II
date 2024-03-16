import tipoAreasSchema from "../models/tiposAreaModels.js"

// Crear un tipo de área
export const createTipoArea = async (req, res) => {
    try {
        const data = new tipoAreasSchema(req.body);
        await data.save();
        res.json({ success: true, message: "Tipo de área guardado exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear el tipo de área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener todos los tipos de área
export const getAllTiposArea = async (req, res) => {
    try {
        const data = await tipoAreasSchema.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los tipos de área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener un tipo de área por su ID
export const getTipoAreaById = async (req, res) => {
    const tipoAreaId = req.params.id;

    try {
        const tipoArea = await tipoAreasSchema.findById(tipoAreaId);
        if (!tipoArea) {
            return res.status(404).json({ success: false, message: "Tipo de área no encontrado" });
        }
        res.json({ success: true, data: tipoArea });
    } catch (error) {
        console.error("Error al obtener el tipo de área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Actualizar un tipo de área por su ID
export const updateTipoArea = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await tipoAreasSchema.findOneAndUpdate({ _id: id }, newData, { new: true });
        res.json({ success: true, message: "Datos del tipo de área actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos del tipo de área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Eliminar un tipo de área por su ID
export const deleteTipoArea = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await tipoAreasSchema.findByIdAndDelete(id);
        res.json({ success: true, message: "Tipo de área eliminado exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar el tipo de área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};
