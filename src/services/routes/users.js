var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");
const { check } = require("express-validator/check");

// Validaciones
const valid_user = [
  // Validación: Nombre
  check(
    "name",
    "El nombre debe tener al menos 3 caracteres y no puede incluir números"
  )
    .isAlpha((locale = "es-ES"), { ignore: "- /" })
    .custom((value) => {
      return value.match(/^[a-zA-Z]{3,}$/);
    }),
  // Validación: Apellidos
  check(
    "surname",
    "Los apellidos indicados debe tener al menos 3 caracteres y no pueden incluir números"
  )
    .isAlpha((locale = "es-ES"), { ignore: "- /" })
    .custom((value) => {
      return value.match(/^[a-zA-Z]{3,}$/);
    }),
  // Validación: Edad
  check("age", "La edad indicada debe estar comprendida entre 0 y 125").isFloat(
    { min: 0, max: 125 }
  ),

  // Validación: Dni
  check("dni", "El dni indicado debe contener 9 caracteres alfanuméricos")
    .isLength({ min: 9, max: 9 })
    .isAlphanumeric(),

  // Validación: Cumpleanos
  check(
    "birthday",
    "El cumpleaños indicado debe especificarse en formato aaaa-mm-dd"
  ).isISO8601(),

  // Validación: ColorFav
  check(
    "favouriteColour",
    "El color favorito indicado debe tener al menos 3 caracteres y no puede incluir números"
  )
    .isAlpha((locale = "es-ES"), { ignore: "- /" })
    .custom((value) => {
      return value.match(/^[a-zA-Z]{3,}$/);
    }),
  // Validación: sexo
  check(
    "gender",
    "El sexo indicado debe ser uno de los siguientes: Hombre, Mujer, Otro, No especificado"
  )
    .isString()
    .isIn(["Hombre", "Mujer", "Otro", "No especificado"]),
];

// GET
router.get("/", users_controller.users_list);

// POST
router.post("/", valid_user, users_controller.users_create);

// PUT
router.put("/:id", valid_user, users_controller.users_update_one);

// DELETE
router.delete("/:id", users_controller.users_delete_one);

module.exports = router;
