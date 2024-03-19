import sedeModel from '../models/sedeModel.js'; // Importa el modelo de sede

// Crear una sede
export const createSede = async (req, res) => {
    try {
        const data = new sedeModel(req.body);
        await data.save();
        res.json({ success: true, message: "Sede guardada exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear la sede:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener todas las sedes
export const getAllSedes = async (req, res) => {
    try {
        const data = await sedeModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las sedes:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Obtener una sede por su ID
export const getSedeById = async (req, res) => {
    const sedeId = req.params.id;

    try {
        const sede = await sedeModel.findById(sedeId);
        if (!sede) {
            return res.status(404).json({ success: false, message: "Sede no encontrada" });
        }
        res.json({ success: true, data: sede });
    } catch (error) {
        console.error("Error al obtener la sede:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Actualizar una sede por su ID
export const updateSede = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const data = await sedeModel.findOneAndUpdate({ _id: id }, newData, { new: true });
        res.json({ success: true, message: "Datos de la sede actualizados exitosamente", data: data });
    } catch (error) {
        console.error("Error al actualizar los datos de la sede:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Eliminar una sede por su ID
export const deleteSede = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await sedeModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Sede eliminada exitosamente", data: data });
    } catch (error) {
        console.error("Error al eliminar la sede:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};
export const deleteArea = async (req, res) => {
    const sedeId = req.params.id;
    const areaId = req.params.areaId;

    try {
        const sede = await sedeModel.findById(sedeId);
        if (!sede) {
            return res.status(404).json({ success: false, message: "Sede no encontrada" });
        }

        sede.Areas.pull({ _id: areaId });
        await sede.save();

        res.json({ success: true, message: "Área eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el área:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
    
};

export const addAreaToSede = async (req, res) => {
    const sedeId = req.params.id;
    const newAreaData = req.body;

    try {
        // Encontrar la sede por su ID
        const sede = await sedeModel.findById(sedeId);
        if (!sede) {
            return res.status(404).json({ success: false, message: "Sede no encontrada" });
        }

        // Agregar el área al arreglo de áreas de la sede
        sede.Areas.push(newAreaData);
        await sede.save();

        res.json({ success: true, message: "Área agregada exitosamente a la sede", data: newAreaData });
    } catch (error) {
        console.error("Error al agregar el área a la sede:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};