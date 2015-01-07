

    Polymer("olba-main", {
      username:"manager2",
      password:"secure",
      addNuevaIncidencia:false,
       publish: {
        modified: {
          value: false,
          reflect: true
        }
      },
      incidencias:[],
        ready: function() {
        this.$.auth.toggle();
      },
      alldata:function(a,b,c){

        for (var i=0;i<this.incidencias.length;i++){
          this.incidencias[i].image=this.incidencias[i].Cliente.replace(" ","")
        }
         this.$.sheetCliente.getAll();
      },
      alldataclientes:function(a,b,c){
        for (var i=0;i<this.clientes.length;i++){
          this.clientes[i].image=this.clientes[i].Cliente.replace(" ","")
        }
         this.$.sheetModulos.getAll();
      },
      alldatamodulos:function(a,b,c){
        for (var i=0;i<this.modulos.length;i++){
          this.modulos[i].image=this.modulos[i].Codigo.replace(" ","")
        }
        this.$.auth.toggle();
      },
      handleEstado:function(event, detail, sender){
        var inci = sender.templateInstance.model.incidencia;
        if (!sender.done && !sender.send){
          inci.Estado="Pendiente";
        }else if (sender.send){
          inci.Estado="Enviada";
        }else{
          inci.Estado="Terminada";
        }

        inci.modified=true;
        this.modified=true;
      },
      saveChanges:function(){
        var send=[["Numero","Estado"]];


        for (var i=0;i<this.incidencias.length;i++){
          if (this.incidencias[i].modified){
            send.push([this.incidencias[i].Numero,this.incidencias[i].Estado]);
          }
        }

        if (send.length>0){
          this.$.sheet.mergeAll(send);
        }
      },
      mergeall:function(){
        if (!this.addNuevaIncidencia){/* Si no añado es que estoy actualizando */
          this.modified=false;

          for (var i=0;i<this.incidencias.length;i++){
            this.incidencias[i].modified=false;
          }
        }else{
          this.addNuevaIncidencia=false;
          this.incidencias.push(this.incidenciaActual)
          this.$.txtIncidencia.value="";

        }
      },
      connect:function(){
        this.$.sheet.getAll();
      },
      nuevaIncidencia:function(){
        this.$.core_animated_pages.selected=1;
        this.$.scaffold.closeDrawer();
      },
      clienteNext:function(event,obj){
        this.clienteActual=obj;
        this.$.core_animated_pages.selected=2;
      },
      moduloNext:function(event,obj){
        this.moduloActual=obj;
        this.$.core_animated_pages.selected=3;
      },
      backCliente:function(){
        this.$.core_animated_pages.selected=1;
      },
      backModulo:function(){
        this.$.core_animated_pages.selected=2;
      },
      addIncidencia:function(){
        var inci={
          "Numero":0,
          "Cliente":this.clienteActual.Cliente,
          "Modulo":this.moduloActual.Codigo,
          "Incidencia":this.$.txtIncidencia.value,
          "Estado":"Pendiente",
          "Fecha inicio":"",
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        inci["Fecha inicio"]=dd+"/"+mm+"/"+yyyy;

        var max=0;
        for (var i=0;i<this.incidencias.length;i++){
          var act=parseInt(this.incidencias[i].Numero);

          if (max<act){
            max=act;
          }
        }

        inci.Numero=max+1;

        var arr=[
          ["Numero","Cliente","Modulo","Incidencia","Estado","Fecha inicio"],
          [inci.Numero,inci.Cliente,inci.Modulo,inci.Incidencia,inci.Estado,inci["Fecha inicio"]]];


        this.incidenciaActual=inci;
        this.incidenciaActual.image=this.incidenciaActual.Cliente.replace(" ","");
        this.addNuevaIncidencia=true;
        this.$.sheet.mergeAll(arr);
      },
      listaPendientes:function(){
        this.$.core_animated_pages.selected=0;
        this.$.scaffold.closeDrawer();
      }

    });
