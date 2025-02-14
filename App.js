import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Firebase setup
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

function App() {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
    };

    useEffect(() => {
        async function fetchCourses() {
            const coursesSnap = await getDocs(collection(db, "courses"));
            setCourses(coursesSnap.docs.map(doc => doc.data()));
        }
        fetchCourses();
    }, []);

    return (
        <div>
            <h1>E-Learning Platform</h1>
            {user ? <p>Welcome, {user.displayName}</p> : <button onClick={login}>Login with Google</button>}
            <h2>Courses</h2>
            <ul>{courses.map((course, index) => <li key={index}>{course.name}</li>)}</ul>
        </div>
    );
}

export default App;
