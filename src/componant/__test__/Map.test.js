import { render , screen , cleanup } from "@testing-library/react";
import Map from '../Map'



test('all polygons apperd',(key)=>{
render(Map);
const poligon = screen.getByTestId(key)
expect(poligon).toBeInTheDocument();
})