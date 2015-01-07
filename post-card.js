
  Polymer("post-card",{
    publish: {
      done: {
        value: false,
        reflect: true
      },
       send: {
        value: false,
        reflect: true
      }
    },
    ready: function() {
      if (this.templateInstance.model.incidencia.Estado=="Pendiente"){
        this.done=false;
        this.send=false;

      }else if (this.templateInstance.model.incidencia.Estado=="Terminada"){
        this.done=true;
        this.send=false;
      }else if (this.templateInstance.model.incidencia.Estado=="Enviada"){
        this.done=true;
        this.send=true;
      }
    },
    doneTapped:function(event, detail, sender){
      this.done = !this.done;
      if (!this.done){
        this.send=false;
      }
      this.fire('done-tap');
    },
    sendTapped:function(event, detail, sender){
      this.send = !this.send;
      if (this.send){
        this.done=true;
      }
      this.fire('send-tap');
    }
  });
