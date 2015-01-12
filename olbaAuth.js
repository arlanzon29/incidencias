Polymer("olba-auth", {

  connect:function(){
    this.username=this.$.txtUsername.value;
    this.password=this.$.txtPassword.value;

    if (chrome.storage!=null){
      chrome.storage.sync.set({'password': this.password,"username":this.username}, this.chromeSync(this));
    }else{
      localStorage.setItem('auth', JSON.stringify({"username":this.username,"password":this.password}));
       this.fire("connect");
    }

  },
  chromeSync:function(obj){
     obj.fire("connect");
  }
});