//middleware para guardar el usuario en la sesion
export const userInSession = (req, res, next) => {
	if (req.session.user) {
		next()
	} else {
		res.redirect('http://localhost:3000/login');
	}
}