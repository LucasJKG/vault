import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function useAdmin() {
    const { user, loading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkRole = async () => {
            if (loading) return;
            if (!user) {
                navigate("/");
                return;
            }

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists() || userDoc.data().role !== "admin") {
                navigate("/");
            } else {
                setIsAdmin(true);
            }
        };
        checkRole();
    }, [user, loading, navigate]);

    return isAdmin;
}
