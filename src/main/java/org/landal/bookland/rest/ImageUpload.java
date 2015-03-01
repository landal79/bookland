package org.landal.bookland.rest;

import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.providers.multipart.PartType;

public class ImageUpload {

	private byte[] data;

	public ImageUpload() {
	}

	public byte[] getData() {
		return data;
	}

	@FormParam("file")
	@PartType(MediaType.MULTIPART_FORM_DATA)
	public void setData(byte[] data) {
		this.data = data;
	}

}
