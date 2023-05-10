import { auth, googleProvider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

export const Auth = ({setIsAuth}) => {

    const cookies = new Cookies();

    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            cookies.set('auth-token', userCredential.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    };

    return <div className='auth-container'>
        <p>Sign in with Google</p>
        <button onClick={signInWithGoogle}> Sign in With Google</button>
    </div>
}