import { fetchContent } from "../utils/fetchContect";

export const ServicioPartidos = async()=> {
    return await fetchContent("partidos")
}