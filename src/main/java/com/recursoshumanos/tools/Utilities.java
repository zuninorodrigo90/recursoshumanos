package com.recursoshumanos.tools;

import javax.crypto.spec.SecretKeySpec;


public class Utilities {
//	 DEV-----------------------------------
//	 JDBC DEV LOCAL
	public static final String JDBC = "C:/jdbc.properties";
//	// JDBC OPER LOCAL
////	 public static final String JDBC = "C:/jdbcOper.properties";
//	// LDAP LOCAL
//	public static final String LDAP = "C:/ldap.properties";
//	// MAIL CONFIG LOCAL
//	public static final String MAIL_CONFIG = "C:/mail.properties";
//	// DOWNLOADFILE LOCAL
//	public static final String DOWNLOADFILE = "C:/downloadfile.properties";
	
	
//	// OPER----------------------------------
//	// JDBC SERVER
//	 public static final String JDBC =
//	 "/opt/configuracion/jdbcOper.properties";
//	// LDAP SERVER
//	 public static final String LDAP = "/opt/configuracion/ldap.properties";
//	// MAIL CONFIG SERVER
//	 public static final String MAIL_CONFIG =
//	 "/opt/configuracion/mail.properties";
//  	// DOWNLOADFILE SERVER
//	 public static final String DOWNLOADFILE =
//	 "/opt/configuracion/downloadfile.properties";

	private static SecretKeySpec secretKey;
	private static byte[] key;

	private static String decryptedString;
	private static String encryptedString;

//	public static void setKey(String myKey) {
//
//		MessageDigest sha = null;
//		try {
//			key = myKey.getBytes("UTF-8");
//			System.out.println(key.length);
//			sha = MessageDigest.getInstance("SHA-1");
//			key = sha.digest(key);
//			key = Arrays.copyOf(key, 16); // use only first 128 bit
//			System.out.println(key.length);
//			System.out.println(new String(key, "UTF-8"));
//			secretKey = new SecretKeySpec(key, "AES");
//
//		} catch (NoSuchAlgorithmException e) {
//			// TODO Auto-generated catch block
//			System.out.println("setKey");
//			e.printStackTrace();
//		} catch (UnsupportedEncodingException e) {
//			System.out.println("setKey 2");
//			e.printStackTrace();
//		}
//	}
//
//	public static String getDecryptedString() {
//		return decryptedString;
//	}
//
//	public static void setDecryptedString(String decryptedString) {
//		Utilities.decryptedString = decryptedString;
//	}
//
//	public static String getEncryptedString() {
//		return encryptedString;
//	}
//
//	public static void setEncryptedString(String encryptedString) {
//		Utilities.encryptedString = encryptedString;
//	}

	/**
	 * Método que modifica el nombre del role para mostrar en UI: reemplaza _
	 * por espacios en blanco, lleva todo a mayúsucula y le elimina el prefijo
	 * ROLE_
	 * 
	 * @param role
	 *            El rol a modificar
	 */
//	public static void roleNameToFrontEnd(Role role) {
//		String name = role.getName().substring(5, role.getName().length());
//		name = name.replaceAll("_", " ");
//		role.setName(name);
//	}

	/**
	 * Método que modifica el nombre del role para guardar en BD: reemplaza
	 * espacios en blanco por _, lleva todo a mayúsucula y le agrega el prefijo
	 * ROLE_
	 * 
	 * @param role
	 *            El rol a modificar
	 */
//	public static void roleNameToDatabase(Role role) {
//		String name = role.getName().replaceAll("\\s+", "_");
//		role.setName("ROLE_" + name.toUpperCase());
//	}

	/**
	 * Método que recibe por parametro un string en el cual los datos se
	 * encuentran separados por comas, el metodo lo divide y retorna una lista
	 * de strings de los valores.
	 * 
	 * @param ncms
	 *            Todos los ncm en un solo string separados por comas.
	 * @return ncmsList lista de string de los ncms ya separados.
	 */
//	public static List<String> ncmsList(String ncms) {
//		String[] ncmsVector = ncms.split(",");
//		List<String> ncmsList = Arrays.asList(ncmsVector);
//		return ncmsList;
//	}

	/**
	 * Método que borra una coma si se encuentra en la primera posición (ejemplo
	 * ",test" retorna "test"), o borra una coma si se encuentra en la última
	 * posición (ejemplo "test," retorna "test")
	 * 
	 * @param identifier
	 *            La cadena de caracteres a buscar la coma
	 * @return La cadena de caracteres sin coma (en el caso de que exista en la
	 *         primera o última posición)
	 */
//	public static String subStringComa(String identifier) {
//		char lastCharacter;
//		char firstCharacter;
//		firstCharacter = identifier.charAt(0);
//		lastCharacter = identifier.charAt(identifier.length() - 1);
//		if (firstCharacter == ',') {
//			return identifier.substring(1, identifier.length());
//		} else {
//			if (lastCharacter == ',') {
//				return identifier.substring(0, identifier.length() - 1);
//			}
//		}
//		return identifier;
//	}

//	public static RequerimientoView getRequerimientoview(Requerimiento requerimiento) {
//		RequerimientoView view = new RequerimientoView();
//		view.setId(requerimiento.getId());
//		// items
//		view.setUser(requerimiento.getUser().getName());
//		view.setDateFrom(new SimpleDateFormat("dd/MM/yyyy").format(requerimiento.getDate()));
//		view.setNumber(requerimiento.getNumber().toString());
//		// imputation
//		view.setReference(requerimiento.getReference());
//		view.setSistemaArmas(
//				requerimiento.getSistemaArmas().getCode() + " - " + requerimiento.getSistemaArmas().getDescription());
//		view.setDestination(requerimiento.getUser().getName().substring(0, 4));
//		view.setImporteTotal(requerimiento.getTotalPrice().toString());
//		view.setState(requerimiento.getState());
//		view.setItems(new LinkedList<DetalleRequerimientoView>());
//		try {
//			for (DetalleRequerimiento detalle : requerimiento.getItems()) {
//				view.getItems().add(getDetalleRequerimientoView(detalle));
//			}
//		} catch (Exception ex) {
//			return null;
//		}
//		//
//		return view;
//	}

//	public static DetalleRequerimientoView getDetalleRequerimientoView(DetalleRequerimiento detalle) {
//		DetalleRequerimientoView view = new DetalleRequerimientoView();
//		view.setId(detalle.getId());
//		view.setOrden(detalle.getOrden());
//		view.setPartNumber(detalle.getCatalogo().getPartNumber());
//		view.setDesignation(detalle.getCatalogo().getDesignacion());
//		view.setProducer(
//				detalle.getCatalogo().getProducer().getCode() + " - " + detalle.getCatalogo().getProducer().getName());
//		view.setMeasurementUnitCode(detalle.getCatalogo().getMeasurementUnit().getCode());
//		view.setQualityName(detalle.getQuality().getName());
//		view.setPriority(detalle.getPriority().getId());
//		view.setObservation(detalle.getObservation());
//		view.setState(detalle.getState());
//		view.setNsn(detalle.getCatalogo().getNsn() + "");
//		view.setPrice(detalle.getPrice());
//		view.setAmount(detalle.getAmount());
//		return view;
//	}


	/**
	 * Función de tipo String que recibe una llave (key), un vector de
	 * inicialización (iv) y el texto que se desea descifrar
	 * 
	 * @param key
	 *            la llave en tipo String a utilizar
	 * @param iv
	 *            el vector de inicialización a utilizar
	 * @param encrypted
	 *            el texto cifrado en modo String
	 * @return el texto desencriptado en modo String
	 * @throws Exception
	 *             puede devolver excepciones de los siguientes tipos:
	 *             NoSuchAlgorithmException, NoSuchPaddingException,
	 *             InvalidKeyException, InvalidAlgorithmParameterException,
	 *             IllegalBlockSizeException
	 */
	// public static String decrypt(String key, String iv, String encrypted)
	// throws Exception {
	// Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
	// SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes(), "AES");
	// IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes());
	// byte[] enc = decodeBase64(encrypted);
	// cipher.init(Cipher.DECRYPT_MODE, skeySpec, ivParameterSpec);
	// byte[] decrypted = cipher.doFinal(enc);
	// return new String(decrypted);
	// }

//	public static String decrypt(String strToDecrypt) {
//		try {
//			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
//
//			cipher.init(Cipher.DECRYPT_MODE, secretKey);
//			setDecryptedString(new String(cipher.doFinal(Base64.decodeBase64(strToDecrypt))));
//
//		} catch (Exception e) {
//
//			System.out.println("Error while decrypting: " + e.toString());
//		}
//		return null;
//	}
//
//	public static String encrypt(String strToEncrypt) {
//		try {
//			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
//
//			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
//
//			setEncryptedString(Base64.encodeBase64String(cipher.doFinal(strToEncrypt.getBytes("UTF-8"))));
//
//		} catch (Exception e) {
//
//			System.out.println("Error while encrypting: " + e.toString());
//		}
//		return null;
//	}

}
