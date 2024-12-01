to create module level lazy load use below cmd
ng generate module primengtemplate --route primengtemplate --module app.module
--------------delete alert----
private sweetAlertService: SweetAlertServiceService

async showConfirmation() {
    const confirmed = await this.sweetAlertService.showConfirmation('Are you sure?', 'This action cannot be undone!');
    
    if (confirmed) {
     //Api call
      console.log('Proceed with the action.');
    } else {
      //nothing
    }
  }
  ----sweet alert

  --getting data using resolve guard done in revenue and complains page
  --this concept got after getting data only load the page.
  --subject service used in complains and revenu for
  this.shareds.fetchMasterData(); // Fetch data if null
  this.shareds.data$.subscribe(data => {
    console.log('revenue data',data)
  });

  --product bike type =3502
  --product battery type =3503
  --product wash type =3504
  -- <img class="frame-2608343" src="../../../assets/img/download.jpg" />