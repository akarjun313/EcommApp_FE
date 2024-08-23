import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseURL/baseURL";

export default function AdminRoute({ children }) {

    const navigate = useNavigate();
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(
                    `${baseUrl}/api/v1/admin/authenticate-admin`,
                    {
                        withCredentials: true,
                    },
                );
                

                const data = res.data;
                console.log(data);

                if (data.success === false) {
                    navigate("/admin/login", { replace: true });
                }
            } catch (error) {
                console.error("Error occurred while checking user:", error);
                navigate("/admin/login", { replace: true });
            }
        };
        checkUser();
    }, [navigate]);
    
    return children
}
