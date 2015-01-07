  Polymer("olba-postcardmodulo",{

    ready: function() {

    },
    click:function(){

      this.fire('next',this.templateInstance.model.modulo);
    }
  });
