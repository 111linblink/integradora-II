// 1
db.usuario.find({
    $and: [
      { fechaRegistro: { $gte: new Date("2022-01-01") } },
      { fechaRegistro: { $lte: new Date("2022-02-28") } },
    ],
  });

  //2
  
  db.usuario.aggregate({
    $project: {
      Fecha: { $toDate: "$FechaRegistro" },
      Nombre_Completo: {
        $concat: ["$NombreUsuario", " ", "$AppU", " ", "$ApmU"],
      },
      _id: 0,
    },
  });
  
  //
  db.usuario.aggregate(
    {
      $project: {
        Fecha: { $toDate: "$FechaRegistro" },
        Nombre_Completo: {
          $concat: ["$NombreUsuario", " ", "$AppU", " ", "$ApmU"],
        },
        _id: 0,
      },
    },
    {
      $match: {
        $and: [
          { Fecha: { $gte: new Date("2022-01-01") } },
          { Fecha: { $lte: new Date("2022-02-28") } },
        ],
      },
    }
  );
  
  // iso da
  db.usuario.aggregate([
    {
      $project: {
        Fecha: { $toDate: "$FechaRegistro" },
        Nombre_Completo: {
          $concat: ["$NombreUsuario", " ", "$AppU", " ", "$ApmU"],
        },
        _id: 0,
      },
    },
    {
      $match: {
        $and: [
          { Fecha: { $gte: ISODate("2022-01-01T00:00:00.000Z") } },
          { Fecha: { $lte: ISODate("2022-02-29T00:00:00.000Z") } },
        ],
      },
    },
  ]);
  
  // año
  db.usuario.aggregate([
    {
      $group: {
        _id: { $year: { $toDate: "$FechaRegistro" } },
        CantidadUsuarios: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        Año: "$_id",
        CantidadUsuarios: 1,
      },
    },
    {
      $sort: {
        Año: 1,
      },
    },
  ]);
  
  //mes
  
  db.usuario.aggregate([
    {
      $group: {
        _id: { $month: { $toDate: "$FechaRegistro" } },
        CantidadUsuarios: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        Año: "$_id",
        CantidadUsuarios: 1,
      },
    },
    { $sort: { Año: 1 } },
  ]);
  
  // dia
  
  db.usuario.aggregate([
    {
      $group: {
        _id: { $dayOfMonth: { $toDate: "$FechaRegistro" } },
        CantidadUsuarios: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        Año: "$_id",
        CantidadUsuarios: 1,
      },
    },
    { $sort: { Año: 1 } },
  ]);
  
  /// exposicion de Luis
  
  load(
    "C:\\Users\\karim\\Documents\\5to Cuatrri\\Base de Datos\\unidad 3\\LUIS\\TorresExpo.js"
  );
  
  //Agregar una nueva unidad a la asignatura "Diseño Grafico " en la coleccion Asignaturas utilizando un $push
  
  db.Asignatura.updateOne(
    {
      NombreAsignatura: "Diseño Gráfico",
    },
    {
      $push: {
        Unidades: { NumUnidad: 4, NombreUnidad: "Lineal", HorasUnidad: 3 },
      },
    }
  );
  
  //Agrupa las asignaturas por carrera
  
  ///////////////////////////////////////26 de febrero 2024
  /////////////////////trabajo
  //.