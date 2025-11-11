import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  api: string;
   
     constructor(private http: HttpClient) {
       this.api = environment.URL + 'Plataforma';
     }
   
     // getList(pagina: number, cantidad: number, busqueda?: string) {
     //   const params = {
     //     pagina: pagina.toString(),
     //     tamanoPagina: cantidad.toString(),
     //     nombre: busqueda ?? '',
     //   };
   
     //   return this.http.get<Results<UsuarioSolicitante>>(`${this.api}/Listar`, {
     //     params,
     //   });
     // }
   
     getId(id: number) {
       //console.log('servicio', id);
       return this.http.get(this.api + '/' + id);
     }
   
     insert(evento: any) {
       return this.http.post(this.api, evento);
     }
   
     update(item: any) {
       return this.http.put(`${this.api}`, item);
     }
 
   
     // patchJerarquia(id: number, jerarquia: string, unidad: number, nombreUnidad: string) {
     //   return this.http.patch(`${this.api}/${id}`, { jerarquia, unidad, nombreUnidad });
     // }
 
   
     delete(id: number, usuarioBaja: number) {
       return this.http.delete(`${this.api}/${id},${usuarioBaja}`);
     }
}
