package org.landal.bookland.google;

public class ClientCredentials {


    static final String API_KEY = "AIzaSyDtzU_S2e8czj_V7M0925rkF65QO-puEl8";

    static void errorIfNotSpecified() {
        if (API_KEY.startsWith("Enter ")) {
            System.err.println(API_KEY);
            System.exit(1);
        }
    }
}
