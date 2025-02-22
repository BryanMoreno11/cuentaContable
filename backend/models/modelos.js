module.exports = (sequelize, DataTypes) => {
    const Cuenta = sequelize.define('Cuenta', {
        id_cuenta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cuenta_padre: {
            type: DataTypes.INTEGER
        },
        descripcion: {
            type: DataTypes.STRING(500)
        },
        orden: {
            type: DataTypes.STRING(500)
        },
        codigo: {
            type: DataTypes.STRING(500)
        },
        grupo: {
            type: DataTypes.STRING(500)
        },
        naturaleza: {
            type: DataTypes.STRING(500)
        },
        padre_nombre: {
            type: DataTypes.STRING(500)
        }
    }, {
        tableName: 'cuenta', 
        timestamps: false
    });

    return Cuenta;
};
