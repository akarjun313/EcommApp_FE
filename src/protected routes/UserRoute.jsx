import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseURL/baseURL";

export default function UserRoute({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(
                    `${baseUrl}/api/v1/user//authenticate-user`,
                    {
                        withCredentials: true,
                    },
                );

                const data = res.data;
                // console.log(data);

                if (data.success === false) {
                    navigate('/sign-up', { replace: true });
                }
            } catch (error) {
                console.error("Error occurred while checking user:", error);
                navigate('/sign-up', { replace: true });
            }
        };
        checkUser();
    }, [navigate]);

    return children;
}
