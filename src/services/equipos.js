import { fetchContent } from "../utils/fetchContect";

export const ServicioEquipos = async()=> {
    return await fetchContent("equipos")
}