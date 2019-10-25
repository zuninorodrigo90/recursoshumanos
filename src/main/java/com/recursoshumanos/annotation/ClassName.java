package com.marina.annotation;

public class ClassName {
	private String className;
	private String descriptionClass;

	public ClassName() {

	}

	public ClassName(String nombreClase, String descriptionClass) {
		this.className = nombreClase;
		this.descriptionClass = descriptionClass;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getDescriptionClass() {
		return descriptionClass;
	}

	public void setDescriptionClass(String descriptionClass) {
		this.descriptionClass = descriptionClass;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((className == null) ? 0 : className.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ClassName other = (ClassName) obj;
		if (className == null) {
			if (other.className != null)
				return false;
		} else if (!className.equals(other.className))
			return false;
		return true;
	}
}
