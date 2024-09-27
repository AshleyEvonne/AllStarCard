package com.sportscards.backend.model;

public enum Status {
    ACTIVE("active"),
    CLOSED("closed");

    private final String value;

    Status(String value){

        this.value = value;
    }
}
