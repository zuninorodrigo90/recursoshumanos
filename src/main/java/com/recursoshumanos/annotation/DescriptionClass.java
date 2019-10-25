package com.marina.annotation;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface DescriptionClass {
	String value() default "Clase no especificada";
}
