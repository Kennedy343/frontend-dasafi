import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos nuestra interfaz desde la carpeta separada
import type { LoginResponse } from '../interface/AuthInterface'; 


// 3. Simulación de la función de login (manteniendo el tipado)
const simulatedLogin = async (email: string, password: string): Promise<LoginResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (email && password.length >= 6) {
                resolve({ 
                    success: true, 
                    message: "Login exitoso", 
                    token: "mock-jwt-token-12345" 
                });
            } else {
                resolve({ 
                    success: false, 
                    message: "Credenciales inválidas. Usa una contraseña de 6+ caracteres." 
                });
            }
        }, 1200);
    });
};


const LoginForm: React.FC = () => {
    // Definición de estados con tipado para strings y booleanos
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response: LoginResponse = await simulatedLogin(email, password); // Usamos el tipo importado

            if (response.success) {
                console.log("Login exitoso. Redirigiendo...");
                // **LÓGICA DE REDIRECCIÓN DE PRUEBA**
                navigate('/dashboard'); 
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Error de conexión con el servidor. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // --- Componentes SVG Internos para evitar librerías externas ---
    const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );
    const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a9.96 9.96 0 0 1 4.51-4.51M21.73 18.36 18.36 14.99"></path>
            <path d="M12 9a3 3 0 1 0 3 3"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );
    const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    );
    const LoaderIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-md p-8 bg-white rounded-xl" style={{boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)'}}>
                <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
                    Inicio de sesión
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Campo de Email */}
                    <div className="mb-6 text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Ingrese su correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none transition duration-150 text-base placeholder-gray-400"
                        />
                    </div>

                    {/* Campo de Contraseña */}
                    <div className="mb-6 text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Contraseña:
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none transition duration-150 text-base placeholder-gray-400 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600 transition p-1"
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    {/* Mensaje de Error */}
                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    {/* Botón de Iniciar Sesión */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 text-white font-bold rounded-lg transition duration-200 
                            ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
                    >
                        {loading ? (
                            <>
                                <LoaderIcon className="text-white" />
                                <span>Cargando...</span>
                            </>
                        ) : (
                            <>
                                <LockIcon className="text-white" />
                                <span>Iniciar sesion</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Separador */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">O continúa con:</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Botones de Login Social */}
                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        className="p-3 border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center hover:shadow-lg transition duration-150 text-xl font-bold text-blue-600"
                        aria-label="Iniciar sesión con Google"
                    >
                        G
                    </button>
                    <button
                        className="p-3 border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center hover:shadow-lg transition duration-150 text-xl font-bold text-gray-900"
                        aria-label="Iniciar sesión con Apple"
                    >
                        
                    </button>
                </div>

                {/* Enlace de Registro */}
                <p className="text-center text-sm text-gray-600">
                    ¿No tienes cuenta? <a 
                        href="/registro" 
                        className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
                    >
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;