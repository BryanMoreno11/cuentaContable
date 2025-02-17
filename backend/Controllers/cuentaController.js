const pool= require("../database");

async function crearCuenta(req, res) {
    const { id_cuenta_padre, descripcion, orden, codigo,
        grupo, naturaleza, padre_nombre
     } = req.body;
     //Valores por defecto
     id_cuenta_padre ? id_cuenta_padre : null;
     descripcion ? descripcion : "";
     orden ? orden : 0;
     codigo ? codigo : "";
     grupo ? grupo : "";
     naturaleza ? naturaleza : "";
     padre_nombre ? padre_nombre : "";
     const query= "INSERT INTO cuenta ( id_cuenta_padre, descripcion, orden, codigo, grupo, naturaleza) VALUES ($1, $2, $3, $4, $5, $6)";
     const values = [id_cuenta_padre, descripcion, orden, codigo, grupo, naturaleza];
   try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if(result.rowCount >0) {
            res.status(200).json({ message: "Cuenta creada exitosamente" });
        } else {
            res.status(400).json({ error: "Error al crear la cuenta" });
        }
    
   } catch (error) {
    res.status(500).json({ error: "Error en el servidor" }); 
   }
}


async function obtenerGrupos(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cuenta WHERE id_cuenta_padre IS NULL');
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}


async function obtenerCuentasHijas(req, res) {
    const id_cuenta_padre = req.params.id;
    const query = 'SELECT * FROM cuenta WHERE id_cuenta_padre = $1';
    const values = [id_cuenta_padre];
    try{
        
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200).json(result.rows);
        if(result.rowCount > 0) {
           return  res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ error: "Cuenta no encontrada" });
        }
    }catch (error) {
       return  res.status(500).json({ error: "Error en el servidor" });
    }
}

async function obtenerCuentas(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cuenta');
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}


module.exports={
    crearCuenta,
    obtenerCuentas,
    obtenerGrupos,
    obtenerCuentasHijas
}