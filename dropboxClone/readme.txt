inicialização do servidor:
npm start pra iniciar o index dentro da pasta routes

    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
        import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyDAYJZAoLKv_OUr5-4v5a0bxAHhGfOB0Uw",
          authDomain: "dropbox-clone-ded9a.firebaseapp.com",
          databaseURL: "https://dropbox-clone-ded9a-default-rtdb.firebaseio.com",
          projectId: "dropbox-clone-ded9a",
          storageBucket: "dropbox-clone-ded9a.appspot.com",
          messagingSenderId: "319237771512",
          appId: "1:319237771512:web:475722a12c36fb528a2b0d",
          measurementId: "G-D6JNCM4KPF"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const database = getDatabase(app);
      </script>

      this.getSelection().length

        let formData = new FormData()
        formData.append('input-file', file)

        ajax.upload.onprogress = event=>{
                    
        this.startUploadTime = Date.now()}