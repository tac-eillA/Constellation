package edu.RR.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by JasonGibson on 8/15/16.
 */
@RestController
@RequestMapping("/upload")
public class UploadController {

    private final UploadService uploadService;

    @Autowired
    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void clear() {
        uploadService.clear();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "text/csv")
    public void uploadCSV(@RequestBody String input) {
        uploadService.parseCSV(input);
    }

    @RequestMapping(method = RequestMethod.GET)
    public String getStudents() {
        return uploadService.getAllStudents();
    }


}
