package com.example.app;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import java.util.concurrent.TimeUnit;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class OkHttpCertPin implements OkHttpClientFactory {
  private static String bankSinarmasHost = "*.banksinarmas.com";
  private static String dimoHost = "*.dimo.co.id";
  private static String simaspoinHost = "simaspoin.id";

  @Override
  public OkHttpClient createNewNetworkModuleClient() {
    CertificatePinner certificatePinner = new CertificatePinner.Builder()
      .add(bankSinarmasHost, "sha256/tHL1mgBqUylBfOSvtgOtepec8Go8d3g9qlvR44p9a7o=")
      .add(bankSinarmasHost, "sha256/5kJvNEMw0KjrCAu7eXY5HZdvyCS13BbA0VJG1RSP91w=")
      .add(bankSinarmasHost, "sha256/r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=")
      .add(dimoHost, "sha256/YqpA7w8DWaYaD+NweeqG3YLNoftVWuup71HaCvxpl0A=")
      .add(dimoHost, "sha256/klO23nT2ehFDXCfx3eHTDRESMz3asj1muO+4aIdjiuY=")
      .add(dimoHost, "sha256/grX4Ta9HpZx6tSHkmCrvpApTQGo67CYDnvprLg5yRME=")
      .add(dimoHost, "sha256/lCppFqbkrlJ3EcVFAkeip0+44VaoJUymbnOaEUk7tEU=")
      .add(simaspoinHost, "sha256/XS6T+u5f8MwiFiIwahT4S7BVN370bWshSpJmdog+dT4=")
      .add(simaspoinHost, "sha256/8Rw90Ej3Ttt8RRkrg+WYDS9n7IS03bk5bjP/UXPtaY8=")
      .add(simaspoinHost, "sha256/Ko8tivDrEjiY90yGasP6ZpBU4jwXvHqVvQI0GS3GNdA=")
      .add(simaspoinHost, "sha256/VjLZe/p3W/PJnd6lL8JVNBCGQBZynFLdZSTIqcO0SJ8=")
      .build();

    OkHttpClient.Builder client = new OkHttpClient.Builder()
      .connectTimeout(0, TimeUnit.MILLISECONDS)
      .readTimeout(0, TimeUnit.MILLISECONDS)
      .writeTimeout(0, TimeUnit.MILLISECONDS)
      .cookieJar(new ReactCookieJarContainer())
      .certificatePinner(certificatePinner);

    return OkHttpClientProvider.enableTls12OnPreLollipop(client).build();
  }
}
