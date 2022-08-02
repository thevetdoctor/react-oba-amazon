export async function login(e, email, password, status, apiUrl, history, dispatch, setLoading, useStateValue) {
    e.preventDefault();
    setLoading(true);
    const payload = {email, password};
    console.log('logging in', payload);
    try {
        const res = await fetch(`${apiUrl}/auth/login`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
        const data = await res.json();
        console.log(data);
        if(data.success) {
            setLoading(false);
            // toast.success("Login successful!", {position: "top-center", hideProgressBar: true});
            const {username, email, status,} = data.data.user;
            let user = {username, email, status}
            dispatch({
                type: 'SET_USER',
                user: user
            })
            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('jwt', data.data.token);
            if(status === 'waiter' || status === 'superadmin') {
                history.push('/dashboard')
            } else {
                history.push('/');
            }
        } else {
            setLoading(false);
            // toast.error("Something went wrong!", {position: "top-center", hideProgressBar: true});
            console.log(data.error);
        }
    } catch(e) {
        setLoading(false);
        console.log('catch error')
    }
}